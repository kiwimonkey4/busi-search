import React from "react";
import { useHistory } from "react-router-dom";

const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");
const prompt = require("prompt");
const { v4: uuidv4 } = require("uuid");

async function retryTxn(n, max, client, operation, callback) {
    await client.query("BEGIN;");
    while (true) {
      n++;
      if (n === max) {
        throw new Error("Max retry count reached.");
      }
      try {
        await operation(client, callback);
        await client.query("COMMIT;");
        return;
      } catch (err) {
        if (err.code !== "40001") {
          return callback(err);
        } else {
          console.log("Transaction failed. Retrying transaction.");
          console.log(err.message);
          await client.query("ROLLBACK;", () => {
            console.log("Rolling back transaction.");
          });
          await new Promise((r) => setTimeout(r, 2 ** n * 1000));
        }
      }
    }
  }

// Run the transactions in the connection pool
(async () => {
    prompt.start();
    const URI = await prompt.get("connectionString");
    var connectionString;
    // Expand $env:appdata environment variable in Windows connection string
    if (URI.connectionString.includes("env:appdata")) {
      connectionString = await URI.connectionString.replace(
        "$env:appdata",
        process.env.APPDATA
      );
    }
    // Expand $HOME environment variable in UNIX connection string
    else if (URI.connectionString.includes("HOME")){
      connectionString = await URI.connectionString.replace(
        "$HOME",
        process.env.HOME
      );
    }
    var config = parse(connectionString);
    config.port = 26257;
    config.database = "bank";
    const pool = new Pool(config);
  
    // Connect to database
    const client = await pool.connect();
  
    // Callback
    function cb(err, res) {
      if (err) throw err;
  
      if (res.rows.length > 0) {
        console.log("New account balances:");
        res.rows.forEach((row) => {
          console.log(row);
        });
      }
    }
  
    // Initialize table in transaction retry wrapper
    console.log("Initializing accounts table...");
    await retryTxn(0, 15, client, initTable, cb);
  
    // Transfer funds in transaction retry wrapper
    console.log("Transferring funds...");
    await retryTxn(0, 15, client, transferFunds, cb);
  
    // Delete a row in transaction retry wrapper
    console.log("Deleting a row...");
    await retryTxn(0, 15, client, deleteAccounts, cb);
  
    // Exit program
    process.exit();
  })().catch((err) => console.log(err.stack));

/* Text box, drop down menu and search button */
const Search = ({ setInputText, query, setQuery }) => {
    const history = useHistory();
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitHandler = () => {
        //e.preventDefault();
        history.push("/Nextpage");
    }
    return(
        <form>
            <input onChange={inputTextHandler} type="text" className="search-bar"/>
            <div className="menu">
                <select name="categories" className="categories">
                    <option value="all">All</option>
                    <option value="continue this">Continue this</option>
                </select>
            </div>
            <button onClick={submitHandler} className="search-button" type="submit">
                <span className="material-icons">search</span>
            </button>
        </form>
    );
};

export default Search;
