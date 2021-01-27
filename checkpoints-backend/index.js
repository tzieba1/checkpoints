const Promise = require('bluebird');
const CheckpointsDAO = require('./CheckpointsDataAccessObject.js');
const PinRepo = require('./PinRepository.js');
const TagRepo = require('./TagRepository.js');
const PinTagRepo = require('./PinTagRepository.js');
const MunicipalParkRepo = require('./MunicipalParkRepository.js');
const ProvincialParkRepo = require('./ProvincialParkRepository.js');
const TrailHeadRepo = require('./TrailHeadRepository.js');
const TrailSegmentRepo = require('./TrailSegmentRepository.js');

const fs = require('fs-extra');

// express package used to create a server
var express = require('express');
// create an express instance to define server
var appServer = express();
// include cors to allow for requests from the ReactJS app running on different port
var cors = require('cors');
// accept requests from any origin
appServer.use(cors({origin: '*'}));

// Database - access object and repositories.
const dao = new CheckpointsDAO('./database.sqlite3');
const pins = new PinRepo(dao);
const tags = new TagRepo(dao);
const pinTags = new PinTagRepo(dao);
const municipalParks = new MunicipalParkRepo(dao);
const provincialParks = new ProvincialParkRepo(dao);
const trailSegments = new TrailSegmentRepo(dao);
const trailHeads = new TrailHeadRepo(dao);

function index() {
  //TODO: Start creating and populating database from locally stored open-source data.
  municipalParks.createTable()
    .then( () => populateMunicipalParks())

    .then(provincialParks.createTable())
    .then(() => populateProvincialParks())

    .then(trailSegments.createTable())
    .then(() => populateTrailSegments())

    .then(trailHeads.createTable())
    .then(() => populateTrailHeads())

    //TODO: Create tables for app data to be generated during use.
    .then(pins.createTable())
    .then(tags.createTable())
    .then(pinTags.createTable());
  
  
  //TODO: Create API and configure AJAX calls to methods supplied in each repository.
  appServer.get("/checkpointsApi",    //  Backend available at localhost:3001/api
    function(request,response)
    {
    switch(request.query.act) {
        case "getPins":
          pins.getAll()
            .then((results, error) => {
              if (error) {
                // console.log(err);
                response.json({"error": "Could not retrieve all pins"});
              } else {
                // console.log(JSON.stringify(results));
                response.json(results);
              }
            });
          break;
        case "getParks":
          let parks = [];
          provincialParks.getAll()
            .then((results, error) => {
              if(error) {
                console.log(error);
                response.json({"error": "Could not retrieve all provincial parks"});
              } else {
              //   console.log(JSON.stringify(results));
                parks = results;
              }
            })
            .then(() => municipalParks.getAll())
            .then((results, error) => {
              if(error) {
                console.log(error);
                response.json({"error": "Could not retrieve all municipal parks"});
              } else {
                for (var i = 0; i < results.length; i++) { parks.push(results[i]); }
                response.json(parks);
              }
            })        
          break;
        case "getTrails":
          let trails = [];
          trailHeads.getAll()
            .then((results, error) => {
              if(error) {
                console.log(error);
                response.json({"error": "Could not retrieve all trail heads parks"});
              } else {
              //   console.log(JSON.stringify(results));
              trails = results;
              }
            })
            .then(() => trailSegments.getAll())
            .then((results, error) => {
              if(error) {
                console.log(error);
                response.json({"error": "Could not retrieve all trail segments parks"});
              } else {
                for (var i = 0; i < results.length; i++) { trails.push(results[i]); }
                response.json(trails);
              }
            })  
          break;
        case "addPin":
          pins.create(request.query.latitude, request.query.longitude, request.query.photo, request.query.date, request.query.description, request.query.state)
            .then((results, error) => { 
              if (error) {
                console.log(error);
                response.json({"error": "Could not insert pin"});
              } else {
                console.log(results);
                response.json({"status" : "Added new pin successfully"});
              }
            });
          break;
        case "updatePin":
          break;
        case "deletePin":
          break;
        default:
          break;
      }
    }
  );

  // catch all case if no route found
  appServer.get('*',function (req, res) {
    res.json({'error': 'route not found'});
  });

  // run the server
  var server = appServer.listen(3001, function(){
    console.log("Listening on port 3001!");
    console.log("WAIT FOR DATABASE INITIALIZATION TO BE COMPLETE...");
  });
}


/**
 * Read in municipalPark JSON data from filesystem for objects array used to create database entries.
 */
function populateMunicipalParks() {
  fs.readJSON("./initialData/Municipal_Park.json")
  .then(obj => {
    let features = obj.features;
    let parks = [];

    // Prepare data to go into the database via Promise with corresponding repository method.
    for(var i = 0; i < features.length; i++) {
      feature = features[i];
      // console.log(properties)
      parks.push({
        name: feature.properties.OFFICIAL_NAME, 
        locationDescription: feature.properties.LOCATION_DESCR, 
        geographicalDescription: feature.properties.GEOG_UNIT_DESCR, 
        area: feature.properties.SYSTEM_CALCULATED_AREA, 
        geometry: feature.geometry.type, 
        coordinates: feature.geometry.coordinates
      });
    }

    return Promise.all(parks.map((park) => {
      return municipalParks.create(park.name, park.locationDescription, park.geographicalDescription, park.area, park.geometry, park.coordinates);
    }));
  })
  .catch(err => console.error(err))
  
  // Verify the municipalParks in the database.
  .then(() => {
    municipalParks.getAll()
      .then((parks) => {
        return new Promise((resolve, reject) => {
          var count = 0;
          parks.forEach((park) => {
            count++;
            // console.log(`municipalParkId = ${park.municipalParkId}`);
            // console.log(`name = ${park.name}`);
            // console.log(`locationDescription = ${park.locationDescription}`);
            // console.log(`geographicalDescription = ${park.geographicalDescription}`);
            // console.log(`area = ${park.area}`);
            // console.log(`geometry = ${park.geometry}`);
            // console.log(`coordinates = ${park.coordinates}`);
          })
          console.log(`Finished asynchronously creating ${count} entries in municipalParks table.`);
          console.log("WAIT...");
        })
    })
  })
}


/**
 * Read in provincialParks JSON data from filesystem for objects array used to create database entries.
 */
function populateProvincialParks() {
  fs.readJSON("./initialData/Provincial_Park_Regulated.json")
  .then(obj => {
    let features = obj.features;
    let parks = [];

    // Prepare data to go into the database via Promise with corresponding repository method.
    for(var i = 0; i < features.length; i++) {
      feature = features[i];
      // console.log(properties)
      parks.push({
        name: feature.properties.PROTECTED_AREA_NAME_ENG, 
        shortName: feature.properties.COMMON_SHORT_NAME, 
        className: feature.properties.PROVINCIAL_PARK_CLASS_ENG, 
        clusterName: feature.properties.CLUSTERNAME, 
        area: feature.properties.SYSTEM_CALCULATED_AREA, 
        geometry: feature.geometry.type, 
        coordinates: feature.geometry.coordinates
      });
    }

    return Promise.all(parks.map((park) => {
      return provincialParks.create(
        park.name, 
        park.shortName, 
        park.className, 
        park.clusterName, 
        park.area, 
        park.geometry, 
        park.coordinates
      );
    }));
  })
  .catch(err => console.error(err))
  
  // Verify the provincialParks in the database.
  .then(() => {
    provincialParks.getAll()
      .then((parks) => {
        return new Promise((resolve, reject) => {
          var count = 0;
          parks.forEach((park) => {
            count++;
            // console.log(`provincialParkId = ${park.provincialParkId}`);
            // console.log(`name = ${park.name}`);
            // console.log(`shortName = ${park.shortName}`);
            // console.log(`className = ${park.className}`);
            // console.log(`clusterName = ${park.clusterName}`);
            // console.log(`area = ${park.area}`);
            // console.log(`geometry = ${park.geometry}`);
            // console.log(`coordinates = ${park.coordinates}`);
          })
          console.log(`Finished asynchronously creating ${count} entries in provincialParks table.`);
          console.log("WAIT...");
        })
    })
  })
}


/**
 * Read in trailSegments JSON data from filesystem for objects array used to create database entries.
 */
function populateTrailSegments() {
  fs.readJSON("./initialData/Ontario_Trail_Network__OTN__Trail_Segment.json")
  .then(obj => {
    let features = obj.features;
    let segments = [];

    // Prepare data to go into the database via Promise with corresponding repository method.
    for(var i = 0; i < features.length; i++) {
      feature = features[i];
      // console.log(properties)
      segments.push({
        hazard: feature.properties.HAZARD_COMMENT, 
        onRoad: feature.properties.ON_ROAD_IND, 
        surface: feature.properties.SURFACE_DETAIL, 
        structure: feature.properties.STRUCTURE, 
        structureDescription: feature.properties.STRUCTURE_DESCR, 
        geometry: feature.geometry.type, 
        coordinates: feature.geometry.coordinates
      });
    }

    return Promise.all(segments.map((segment) => {
      return trailSegments.create(
        segment.hazard, 
        segment.onRoad, 
        segment.surface, 
        segment.structure, 
        segment.structureDescription, 
        segment.geometry, 
        segment.coordinates
      );
    }));
  })
  .catch(err => console.error(err))
  
  // Verify the trailSegments in the database.
  .then(() => {
    trailSegments.getAll()
      .then((segments) => {
        return new Promise((resolve, reject) => {
          var count = 0;
          segments.forEach((segment) => {
            count++;
            // console.log(`trailSegmentId = ${segment.trailSegmentId}`);
            // console.log(`hazard = ${segment.hazard}`);
            // console.log(`onRoad = ${segment.onRoad}`);
            // console.log(`surface = ${segment.surface}`);
            // console.log(`structure = ${segment.structure}`);
            // console.log(`structureDescription = ${segment.structureDescription}`);
            // console.log(`geometry = ${segment.geometry}`);
            // console.log(`coordinates = ${segment.coordinates}`);
          })
          console.log(`Finished asynchronously creating ${count} entries in trailSegments table.`);
          console.log("COMPLETE");
        })
    })
  })
}


/**
 * Read in trailHeads JSON data from filesystem for objects array used to create database entries.
 */
function populateTrailHeads() {
  fs.readJSON("./initialData/Ontario_Trail_Network__OTN__Trailhead.json")
  .then(obj => {
    let features = obj.features;
    let heads = [];

    // Prepare data to go into the database via Promise with corresponding repository method.
    for(var i = 0; i < features.length; i++) {
      feature = features[i];
      // console.log(properties)
      heads.push({
        name: feature.properties.TRAIL_NAME, 
        grouping: feature.properties.TRAIL_GROUPING,  
        association: feature.properties.TRAIL_ASSOCIATION, 
        associationWebsite: feature.properties.TRAIL_ASSOCIATION_WEBSITE, 
        description: feature.properties.DESCRIPTION, 
        geometry: feature.geometry.type, 
        coordinates: feature.geometry.coordinates
      });
    }

    return Promise.all(heads.map((head) => {
      return trailHeads.create(
        head.name, 
        head.grouping, 
        head.association, 
        head.associationWebsite, 
        head.description,
        head.geometry, 
        head.coordinates
      );
    }));
  })
  .catch(err => console.error(err))
  
  // Verify the trailHeads in the database.
  .then(() => {
    trailHeads.getAll()
      .then((heads) => {
        return new Promise((resolve, reject) => {
          var count = 0;
          heads.forEach((park) => {
            count++;
            // console.log(`trailHeadId = ${park.trailHeadId}`);
            // console.log(`name = ${park.name}`);
            // console.log(`grouping = ${park.grouping}`);
            // console.log(`association = ${park.association}`);
            // console.log(`associationWebsite = ${park.associationWebsite}`);
            // console.log(`description = ${park.description}`);
            // console.log(`geometry = ${park.geometry}`);
            // console.log(`coordinates = ${park.coordinates}`);
          })
          console.log(`Finished asynchronously creating ${count} entries in trailHeads table.`);
          console.log("WAIT...");
        })
    })
  })
}


// Execute main method that creates server database, defines server API, and starts server.
index();