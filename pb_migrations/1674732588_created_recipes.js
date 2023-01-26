migrate((db) => {
  const collection = new Collection({
    "id": "k8uqibs07n10tl3",
    "created": "2023-01-26 11:29:48.891Z",
    "updated": "2023-01-26 11:29:48.891Z",
    "name": "recipes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "v1xy1ozf",
        "name": "recipe_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0wnn1e9d",
        "name": "recipe_author",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "pkdtyf5t",
        "name": "recipe_ingredients",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hz2pouke",
        "name": "recipe_instructions",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k8uqibs07n10tl3");

  return dao.deleteCollection(collection);
})
