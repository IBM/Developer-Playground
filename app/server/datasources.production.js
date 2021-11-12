module.exports = {
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "transient": {
    "name": "transient",
    "connector": "transient"
  },
  "accounts": {
    "url": process.env.CLOUDANT_URL,
    "database": "accounts",
    "name": "accounts",
    "connector": "cloudant"
  },
  "identities": {
    "url": process.env.CLOUDANT_URL,
    "database": "identities",
    "name": "identities",
    "connector": "cloudant"
  },
  "roles": {
    "url": process.env.CLOUDANT_URL,
    "database": "roles",
    "name": "roles",
    "connector": "cloudant"
  },
  "rolemappings": {
    "url": process.env.CLOUDANT_URL,
    "database": "rolemappings",
    "name": "rolemappings",
    "connector": "cloudant"
  },
  "conversations": {
    "url": process.env.CLOUDANT_URL,
    "database": "conversations",
    "name": "conversations",
    "connector": "cloudant"
  },
  "mappings": {
    "url": process.env.CLOUDANT_URL,
    "database": "mappings",
    "name": "mappings",
    "connector": "cloudant"
  }
};
