module.exports = (rows, typeModel) => {
    let docs = rows.map((row) => row.doc || row.key);
    return docs.filter((doc) => doc.typeModel && doc.typeModel === typeModel);
};