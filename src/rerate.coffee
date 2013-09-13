#!/usr/bin/env node

fs = require 'fs'
_ = require 'underscore'

topology = JSON.parse fs.readFileSync 'us.json'
geo = topology.objects.counties.geometries
arr = _.range geo.length

geo[i].properties.rate *= 0.01 for i in arr

fs. writeFileSync 'us4.json', JSON.stringify topology