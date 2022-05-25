# FC-Cache

## Description
MongoDB based cache.

## Usage
To start the application, following steps need to be performed.
1. Clone the repository.
2. Create a copy of ```.env.default``` file and name it ```.env```.
3. Add Mongodb url in the ```.env``` file.
4. Run the containers using the following command.
    ```bash
    docker-compose up --build -d
    ```
    
Application would start running on Port ```4000``` a

##### Sample API Requests: 
* To fetch the value against a key  , hit  ```{base_url}/api/cache/values/:key``` endpoint with GET request.

* To fetch the list of available keys in the cache  , hit  ```{base_url}/api/cache/keys``` endpoint with GET request.


* To upsert a key in the cache, hit  ```{base_url}/api/cache/``` endpoint with PUT request. Following is the sample request body.
    ```javascript
    {
        "key":"xx",
        "value":"xxx",
        "ttl":"5000"
    }
    ```

* To delete a specific key-value pair in the cache  , hit  ```{base_url}/api/cache/keys/:id``` endpoint with DELETE request.

* To clear all the cache  , hit  ```{base_url}/api/cache/keys``` endpoint with DELETE request.

## Test

```bash
npm test
```