const Match = require('../models/Match');

describe('Match Model Tests', () => {
    it('should create a new match', async () => {
        const match = new Match({ /* match data */ });
        await match.save();
        const foundMatch = await Match.findById(match._id);
        expect(foundMatch).toBeDefined();
    });
});