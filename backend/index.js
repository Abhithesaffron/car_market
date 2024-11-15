// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const elasticsearch = require('@elastic/elasticsearch');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Use environment variables for sensitive configuration
const port = process.env.PORT || 5000;
const elasticsearchUrl = process.env.ELASTICSEARCH_URL;
const elasticsearchUsername = process.env.ELASTICSEARCH_USERNAME;
const elasticsearchPassword = process.env.API_KEY;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Initialize the Elasticsearch client (legacy)
const client = new elasticsearch.Client({
    node: elasticsearchUrl ,
    auth: {
      apiKey: elasticsearchPassword
    }
});

// Define the index for storing car data
const indexName = 'cars';

// Create a new car entry in Elasticsearch
app.post('/api/cars', async (req, res) => {
  try {
    const { carType, carCompany } = req.body;

    // Insert a document into the Elasticsearch index
    const response = await client.index({
      index: indexName,
      body: {
        carType,
        carCompany,
        createdAt: new Date()
      }
    });

    res.status(200).json({ message: 'Car details saved', data: response });
  } catch (error) {
    console.error('Error storing car details:', error);
    res.status(500).json({ message: 'Error storing car details' });
  }
});

// Fetch car data for the dashboard
app.get('/api/dashboard', async (req, res) => {
  try {
    // Aggregation query to get car types and companies
    const response = await client.search({
      index: indexName,
      body: {
        aggs: {
          car_types: {
            terms: {
              field: 'carType.keyword', // Keyword field for exact matching
              size: 10
            }
          },
          car_companies: {
            terms: {
              field: 'carCompany.keyword', // Keyword field for exact matching
              size: 10
            }
          }
        },
        size: 0 // We don't need the actual documents, just the aggregation results
      }
    });

    // Format and return the aggregated data for the charts
    const carTypes = response.aggregations.car_types.buckets.map((bucket) => ({
      name: bucket.key,
      count: bucket.doc_count
    }));

    const carCompanies = response.aggregations.car_companies.buckets.map((bucket) => ({
      name: bucket.key,
      count: bucket.doc_count
    }));

    res.status(200).json({
      carTypes,
      carCompanies
    });
  } catch (error) {
    console.error('Error fetching data for dashboard:', error);
    res.status(500).json({ message: 'Error fetching data for dashboard' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
