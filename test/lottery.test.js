const Lottery = artifacts.require("Lottery");
// const { assert } = require('chai');
const assertRevert = require('./assertRevert')

const expectEvent = require('./expectEvent');
contract('Lottery',function([deployer, user1, user2]) {
    let lottery;
    let betAmount = 5 * 10 ** 15;
    // let betAmountBN = new web3.utils.BN('5000000000000000');
    let bet_block_interval = 3;

    beforeEach(async () => {
        console.log('Before each');
        lottery = await Lottery.new();
    });

    // it.only('getPot should return current pot',async() => {
    //     console.log('Basic test')
    //     let pot = await lottery.getPot();

    //     assert.equal(pot, 0)
    // })
    // it('getPot should return current pot',async () => {
    //     let pot = await lottery.getPot();
    //     assert.equal(pot, 0);
    // })

    // describe('Bet', function() {
    //     it('should fail when the bet money is not 0.005 ETH',async() => {
    //         //Fail transaction
    //         await assertRevert(lottery.bet('0xab',{from : user1, value : 5000000000000000 }));

    //         //transaction object {chainId, value, to, from, gas(Limit),gas Price}
    //     })

    //     it('should put the bet to the bet queue with 1 bet',async() => {
    //         // //bet
    //         let receipt = await lottery.bet('0xab', {from : user1, value: betAmount});
    //         // console.log(receipt)
    //         let pot = await lottery.getPot();
    //         assert.equal(pot, 0);
    //         // //check contract balance == 0.005
    //         let contractBalance = await web3.eth.getBalance(lottery.address);

    //         assert.equal(contractBalance, betAmount)
    //         // assert.equal(bet.answerBlockNumber, currentBlockNumber + bet_block_interval);
    //         // //check bet info
    //         let currentBlockNumber = await web3.eth.getBlockNumber();

    //         let bet = await lottery.getBetInfo(0);
    //         assert.equal(bet.answerBlockNumber, currentBlockNumber + bet_block_interval);
    //         assert.equal(bet.better, user1);
    //         assert.equal(bet.challenges, '0xab')
    //         // //check log

    //         await expectEvent.inLogs(receipt.logs, 'BET')

    //     });
    // })
    describe.only('isMatch', function() {
        let blockHash = '0xade7573c8ce2aca67ee640a8db9fa6294dbea7ad326d86f54a3357770d0e9c2d'

        it('should be BettingResult.Win when two characters match', async() => {
            let matchingResult = await lottery.isMatch('0xab',blockHash);
            assert.equal(matchingResult,1);
        });
        it('should be BettingResult.Fail when two characters match', async() => {
            let matchingResult = await lottery.isMatch('0xcd',blockHash);
            assert.equal(matchingResult,0);
        });            
        it('should be BettingResult.Draw when two characters match', async() => {
            let matchingResult = await lottery.isMatch('0xaf',blockHash);
            assert.equal(matchingResult,2);
            matchingResult = await lottery.isMatch('0xfb',blockHash);
            assert.equal(matchingResult,2);
        });            
    })
    // describe.only('Distribute', function() {
    //     describe('When the answer is checkable', function() {
    //         it('should give the user the pot when the answer matches', async() => {
    //             //??? ?????? ??? ????????? ???
    //             await lottery.setAnswerForTest('0x1ee7573c8ce2aca67ee640a8db9fa6294dbea7ad326d86f54a3357770d0e9c2d', {from:deployer})

    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xab', {from: user1, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
                
    //             let potBefore = await lottery.getPot();
    //             let user1BalanceBefore = await web3.eth.getBalance(user1);

    //             let receipt7 = await lottery.betAndDistribute('0xef', {from: user2, value: betAmount});

    //             let potAfter = await lottery.getPot();

    //             let user1BalanceAfter = await web3.eth.getBalance(user1);

    //             //pot??? ????????? ??????
    //             assert.equal(potBefore.toString(),new web3.utils.BN('10000000000000000').toString());
    //             assert.equal(potAfter.toString(), new web3.utils.BN('0').toString());

    //             //user(winner)??? ???????????? ??????
    //             user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
    //             assert.equal(user1BalanceBefore.add(potBefore).add(betAmountBN).toString(), new web3.utils.BN(user1BalanceAfter).toString())
    //         })

    //         it('should give the user the amount he or she bet when a single character matches', async() => {
    //             //??? ?????? ??? ????????? ???
    //             await lottery.setAnswerForTest('0xabec17438e4f0afb9cc8b77ce84bb7fd501497cfa9a1695095247daa5b4b7bcc', {from:deployer})

    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xab', {from: user1, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
                
    //             let potBefore = await lottery.getPot();
    //             let user1BalanceBefore = await web3.eth.getBalance(user1);

    //             let receipt7 = await lottery.betAndDistribute('0xef', {from: user2, value: betAmount});

    //             let potAfter = await lottery.getPot();

    //             let user1BalanceAfter = await web3.eth.getBalance(user1);

    //             //pot??? ????????? ??????
    //             assert.equal(potBefore.toString(), potAfter.toString())


    //             //user(winner)??? ???????????? ??????
    //             user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
    //             assert.equal(user1BalanceBefore.add(betAmountBN).toString(), new web3.utils.BN(user1BalanceAfter).toString())
    //         })
    //         it('should get the eth of user when the answer does not match at all', async() => {
    //             //??? ?????? ??? ????????? ???
    //             await lottery.setAnswerForTest('0xabec17438e4f0afb9cc8b77ce84bb7fd501497cfa9a1695095247daa5b4b7bcc', {from:deployer})

    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xab', {from: user1, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
    //             await lottery.betAndDistribute('0xef', {from: user2, value:betAmount});
                
    //             let potBefore = await lottery.getPot();
    //             let user1BalanceBefore = await web3.eth.getBalance(user1);

    //             let receipt7 = await lottery.betAndDistribute('0xef', {from: user2, value: betAmount});

    //             let potAfter = await lottery.getPot();

    //             let user1BalanceAfter = await web3.eth.getBalance(user1);

    //             //pot??? ????????? ??????
    //             assert.equal(potBefore.add(betAmountBN).toString(), potAfter.toString())


    //             //user(winner)??? ???????????? ??????
    //             user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
    //             assert.equal(user1BalanceBefore.toString(), new web3.utils.BN(user1BalanceAfter).toString())
    //         })
    //         describe('when the answer is not revealed(Not Mined)', function() {

    //         })

    //         describe('when the answer is not revealed(Block limit is passed)', function() {

    //         })
    //     })

    // })
});