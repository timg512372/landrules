const LandRules = artifacts.require('LandRules');
const chai = require('chai');
const expect = chai.expect;
var BN = require('bn.js');
var bnChai = require('bn-chai');
const { assert } = require('chai');
chai.use(bnChai(BN));

contract('LandRules', (accounts) => {
    const [owner, admin, alice, bob] = accounts;
    const name = 'Deed Name';
    const secondName = 'Deed Name 2';
    const jsonHash = 'bef57ec7f53a6d40beb640a780a639c83bc29ac8a9816f1fc6c5c6dcd93c4721';
    const coordinates = '[[1,2],[3,4]]';
    const newStatus = 'C';

    let contractInstance;
    beforeEach(async () => {
        contractInstance = await LandRules.new();
    });
    context('Creating deeds', async () => {
        it('Users should be able to create deeds', async () => {
            let events = await contractInstance.newDeed(name, jsonHash, coordinates);
            expect(events.logs[0].args.name).to.equal(name);
            expect(events.logs[0].args.jsonHash).to.equal(jsonHash);
            expect(events.logs[0].args.coordinates).to.equal(coordinates);
            expect(events.logs[0].args.status).to.equal('P');
            expect(events.logs[0].args.deedId).to.eq.BN(0);
        });

        it('Users should be able to create multiple deeds', async () => {
            await contractInstance.newDeed(secondName, jsonHash, coordinates);
            let events = await contractInstance.newDeed(name, jsonHash, coordinates);
            expect(events.logs[0].args.name).to.equal(name);
            expect(events.logs[0].args.jsonHash).to.equal(jsonHash);
            expect(events.logs[0].args.coordinates).to.equal(coordinates);
            expect(events.logs[0].args.status).to.equal('P');
            expect(events.logs[0].args.deedId).to.eq.BN(1);
        });
    });

    context('Editing deeds', async () => {
        it('Admins should be able to edit deed status', async () => {
            await contractInstance.setAdminAuthorization(admin, true, { from: owner });
            await contractInstance.newDeed(name, jsonHash, coordinates);
            await contractInstance.setStatus(newStatus, 0, { from: admin });

            let storedToken = await contractInstance.deedArray(0, { from: admin });
            expect(storedToken.status).to.equal(newStatus);
        });

        it('Non-admins should not be able to edit deed status', async () => {
            await contractInstance.setAdminAuthorization(admin, true, { from: owner });
            await contractInstance.newDeed(name, jsonHash, coordinates);
            try {
                await contractInstance.setStatus(newStatus, 0, { from: alice });
                assert(false);
            } catch {
                assert(true);
            }

            let storedToken = await contractInstance.deedArray(0, { from: owner });
            expect(storedToken.status).to.equal('P');
        });
    });

    context('Transferring deeds', async () => {
        it('Owners should be able to transfer deeds', async () => {
            await contractInstance.newDeed(name, jsonHash, coordinates, { from: alice });
            await contractInstance.transferDeed(0, bob, { from: alice });

            let bobsdeeds = await contractInstance.getDeedByOwner(bob);
            expect(bobsdeeds.length).to.equal(1);

            let alicedeeds = await contractInstance.getDeedByOwner(alice);
            expect(alicedeeds.length).to.equal(0);
        });
    });
});
