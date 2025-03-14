// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    address public admin;
    string private baseURI;

    constructor(string memory _baseURI) ERC721('SimpleNFT', 'SNFT') Ownable() {
        admin = msg.sender;
        baseURI = _baseURI;
    }

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
