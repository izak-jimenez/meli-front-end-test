import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { itemsApiEndpoint, itemDetailsEndpoint } from '../../config/constants'

/* 
let chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const {itemsApiEndpoint, itemDetailsEndpoint} = require('../../config/constants') */

chai.use(chaiHttp)

console.log('Running integration tests suite...')

describe('MLA API - /item', () => {
  it('Should make a GET request to the /items resource with a query parameter and receive a list of results', () => {
    // Make GET request to the /items resource using a query parameter
    chai
      .request('http://localhost:3001')
      .get(itemsApiEndpoint.replace('{query', 'nintendo'))
      .end((err: any, res: any) => {
        expect(res).to.have.status(200)
        expect(res).to.have.nested.property('body.author').that.has.nested.property('name').and.has.nested.property('lastname')
        expect(res).to.have.nested.property('body.categories').to.be.an('array').that.contains('string')
      })
  })
})

export {}


