# 🥗 Food Mart

Indulge in nutritious meals while effortlessly monitoring the calorie content per serving. Our system utilizes IPFS to store food images, which are seamlessly listed within the contract along with descriptive data for each item.

# 🗺️ Navigate through the frontend end
* Connect your wallet on the top right.
* Hover on the image of the meal you want to order to know the amount of calories per serving.
* Navigate to the food category of your choice by clicking on your desired meal choice on the Nav bar.

# 🧱 Building 
* ```yarn install``` to install locally.
* In the same terminal, start your local network run ```yarn chain```.
* Add you ```.env``` file to ``` packages/hardhat``` folder.
* The default network is set to sepolia. To change this, go to the ```packages/hardhat/hardhat.config.js``` file. Then change the ```defaultnetwork```.
* Specify the ```DEPLOYER_PRIVATE_KEY``` variable in the ```.env``` file and insert your wallet's private key.
* Deploy your contract using ```yarn deploy```
* To confirm the integrity of your contract, run  ```yarn verify```  or, if using a network other than sepolia without altering the default network, execute ```yarn verify --network your_network```.

## 🧭 Locations

- The smart contract is `YourContract.sol` in `packages/hardhat/contracts`
- The frontend is in `packages/nextjs/pages`
- The deployment scripts is in `packages/hardhat/deploy`
- The smart contract data is in `packages/hardhat/data`


## 📃 Smart Contract description
  This Solidity smart contract, ```YourContract.sol```. The contract is geared towards listing items, facilitating user purchases, and enabling the owner to withdraw the accumulated funds.

### Key Components
#### Structs
1. Item: Represents an item for sale with attributes such as ID, name, category, image URL, cost, rating, and description.
2. Order: Captures the details of a purchase order, including the timestamp of the transaction and the associated item.



   
#### Functions:
1. ```list()```: 
* Description: Allows the contract owner to list new items.
* Parameters:
  
    _id: Unique identifier for the item.

    _name: Name of the item.

    _category: Category to which the item belongs.

    _image: URL pointing to the item's image.

    _cost: Cost of the item.
  
    _rating: Rating assigned to the item.
  
    _description: Descriptive information about the item.
  
* Access Restriction: Only accessible by the contract owner (onlyOwner modifier).
* Behavior:
    - Creates a new Item struct with the provided details.
    - Adds the item to the items mapping.
    - Emits a List event with the item's name and cost.

  
2. ```buy()```:
* Description: Allows users to purchase items by providing the item's ID and sufficient Ether.
* Parameters:
    _id: ID of the item to be purchased.
* Behavior:
    - Fetches the details of the specified item.
    - Requires the user to send enough Ether to cover the item's cost.
    - Creates a new Order struct with the current timestamp and the purchased item.
    - Records the order for the user in the orders mapping.
    - Emits a Buy event with details about the buyer, order ID, and item ID.

3. ```withdraw()```
* Description: Permits the contract owner to withdraw the accumulated balance.
* Access Restriction: Only accessible by the contract owner (onlyOwner modifier).
* Behavior:
    - Initiates a fund withdrawal to the owner's address using a low-level call operation.
    - Ensures the withdrawal is successful.
 

  
#### Usage Highlights
1. Listing Items:
The owner lists items by calling the ```list()``` function, providing details such as name, category, cost, and more.

2. Making a Purchase:
Users initiate a purchase by calling the ```buy()``` function with the ID of the desired item and sending sufficient Ether.

4. Owner Withdrawal:
The contract owner can withdraw the accumulated funds using the ```withdraw()``` function.


This food web app was built with [Scaffold-ETH 2](https://scaffoldeth.io).
