migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8uqibs07n10tl3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5awlm05a",
    "name": "recipe_description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8uqibs07n10tl3")

  // remove
  collection.schema.removeField("5awlm05a")

  return dao.saveCollection(collection)
})
