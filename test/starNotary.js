//import 'babel-polyfill';
const StarNotary = artifacts.require('./starNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
  });

  it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.deepEqual(await instance.tokenIdToStarInfo.call(tokenId), ['Awesome Star!', true])
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  });

  // Write Tests for:

  // 1) The token name and token symbol are added properly.
  it('The token name and token symbol are added properly.', async() => {
    let name = 'Nojoom'
    let symbol = 'NJM'
    //since they are both declared public variables then their getters will be created automatically.
    assert.equal(await instance.name(), name)
    assert.equal(await instance.symbol(), symbol)
  });

  // 2) 2 users can exchange their stars.
  it('2 users can exchange their stars.', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]

    let firstStarId = 6
    let secondStarId = 7

    await instance.createStar('first star', firstStarId, {from: user1})
    await instance.createStar('second star', secondStarId, {from: user2})

    //approve user1 to transfer second star
    await instance.approve(user1, secondStarId, {from: user2})

    await instance.exchangeStars(firstStarId, secondStarId, {from: user1})
    
    assert.equal(await instance.ownerOf.call(secondStarId), user1)
    assert.equal(await instance.ownerOf.call(firstStarId), user2)

  });
// 3) Stars Tokens can be transferred from one address to another.

  it('Stars Tokens can be transferred from one address to another.', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]

    let newStarId = 8; 

    await instance.createStar('newly created star!', newStarId, {from: user1})

    await instance.transferStar(user2, newStarId, {from: user1});

    assert.equal(await instance.ownerOf.call(newStarId), user2);
  });