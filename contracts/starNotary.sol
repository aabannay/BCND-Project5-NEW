pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star {
        string name;
        bool exists;
    }

//  Add a name and a symbol for your starNotary tokens
    string public name = "Nojoom"; //this means stars in arabic
    string public symbol = "NJM";  //Najm is A star in arabic
//

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string _name, uint256 _tokenId) public {
        //set existance variable to true 
        Star memory newStar = Star({name: _name, exists: true});

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

// Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
    function lookUptokenIdToStarInfo(uint256 tokenId) returns(string){
        require(tokenIdToStarInfo[tokenId].exists, "Star does not exist.");
        
        Star memory theStar = tokenIdToStarInfo[tokenId];

        return theStar.name; 
    }
//

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;

      }

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) {
        //in order to exchange 2 tokens the user who calls this function should own the first star
        //and the second star should be listed for sale.
        require(_isApprovedOrOwner(msg.sender, _tokenId1));
        require(_isApprovedOrOwner(msg.sender, _tokenId2));

        _removeTokenFrom(ownerOf(_tokenId1), _tokenId1);
        _addTokenTo(ownerOf(_tokenId2), _tokenId1); 

        _removeTokenFrom(ownerOf(_tokenId2), _tokenId2);
        _addTokenTo(ownerOf(_tokenId1), _tokenId2);
    }
//

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
//
    function transferStar(address to, uint256 _tokenId) {
        require(ownerOf(_tokenId) == msg.sender); 

        safeTransferFrom(msg.sender, to, _tokenId);
    }
}
