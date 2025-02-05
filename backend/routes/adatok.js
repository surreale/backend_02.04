// Példa route (pl. routes/adatok.js)

const express = require('express');
const router = express.Router();
const db = require('../db/dboperations');


// Összes adat egy adott táblából
//példa url: http://localhost:8080/adatok
router.get('/', async (req, res) => {
  try {
    const adatok = await db.getAllData();
    res.json(adatok);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az adatok lekérésekor.' });
  }
});

//http://localhost:8080/adatok/filtered?limit=2&offset=0
router.get('/filtered1', async (req, res) => {
  let limit= parseInt(req.query.limit, 10);
  let offset= parseInt(req.query.offset, 10);
    try {
        const results = await db.getFilterData(limit, offset);
            res.json(results);
          
    } catch (error) {
      res.status(500).json({ error: 'Hiba történt az adatok lekérésekor.' });
    }
  });

  //http://localhost:8080/adatok/2
  router.get('/azon:id', async (req, res) => {
    try {
      const id= req.params.id;
      const adatok = await db.getDataById(id);
      if(adatok){
        res.json(adatok);
      }
      
    } catch (error) {
      res.status(500).json({ error: 'Hiba történt az adatok lekérésekor.' });
    }
  });
  //http://localhost:8080/adatok/filtered?marka=ford&tipus=autó&szijszine=sötét
  router.get('/filtered2', async (req, res) => {
    try{
      const filters={
        marka: req.query.marka,
        tipus: req.query.tipus,
        szijszine: req.query.szijszine
      };
      const results = await db.getFilterrData(filters);
      res.json(results);

    }
    catch (error) {
      res.status(500).json({ error: 'Hiba történt az adatok lekérésekor.' });
    }
  });
module.exports = router;
