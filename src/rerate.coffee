#!/usr/bin/env coffee

fs = require 'fs'
_ = require 'underscore'

topology = JSON.parse fs.readFileSync 'us.json'
geo = topology.objects.counties.geometries
geometries = _.range geo.length

geo[i].properties.rate *= 0.01 for i in geometries

fs. writeFileSync 'us4.json', JSON.stringify topology