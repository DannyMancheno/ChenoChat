
const mysql = require('mysql');


// ########## DATABASE CONNECTION ##########################################################################################################
// #########################################################################################################################################
var connection = mysql.createConnection({
    host: 'awseb-e-y9giweg2ci-stack-awsebrdsdatabase-znskistgmgix.cqdvk67uu8ru.us-east-2.rds.amazonaws.com',
    user: 'ChenoChatRoot',
    password: 'dvm1181997CHENOCHATDB',
    port: '3306'
})

// Predefined values
let SELECT = 'SELECT'; 
let INSERT = 'INSERT';
let UPDATE = 'UPDATE';
let DELETE = 'DELETE';

// Query Object example 
// Method to using this code. 
// 1 - Client will aggregate data and send it to the API. 
// 2 - API will handle the data/tokens and call queryDB()
// 3 - queryDB() will handle any query string or query object using queryParser()
// 4 -  queryParser() will parse any query object back into a tangible query string
// 5 - queryDB() will return a PROMISE after querying the database using the query string/object-stringified
// 6 - API will handle PROMISE resolve/reject using queryDB(query).then().catch()

// let query = {
//     statement: 'SELECT',
//     table: 'mytable',
//     columns: 'column1, column2',
//     data: {key1: 'stringValue', key2: 123, key3: true},
//     condition: {condition1: 'condition1', condition2: 'condition2'}
// }


function queryParser(queryObject){
    let queryString = '';
    if(queryObject.statement === undefined){
        console.log('No crud statement provided!');
        return;
    }
    if(queryObject.table === undefined){
        console.log('No db table provided!');
        return;
    }

    if(queryObject.statement === 'SELECT' ){

        let conditionString = '';
        if(queryObject.condition === undefined || queryObject.condition === ''){
            // No WHERE clause, just select * or provided column string
            queryString = `SELECT ${queryObject.columns ? queryObject.columns : '*'} FROM ChenoChat.${queryObject.table}`;
        }
        else{
            // WHERE clause provided, either a string or object
            if(typeof(queryObject.condition) === 'string' ){
                // WHERE clause was a string, simply pass it on
                conditionString += queryObject.condition
            }
            else if(typeof(queryObject.condition) === 'object'){
                // WHERE clause was an obhect, parse it
                let conditionKeys = Object.keys(queryObject.condition);
                let conditionValues = Object.values(queryObject.condition);
                for(let i = 0; i < conditionKeys.length; i++){
                    if(i == conditionKeys.length - 1){
                        //Last condition
                        conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' `: `${conditionValues[i]} `}`
                    }
                    else{
                        conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' AND `: `${conditionValues[i]} AND `}`
                    } 
                }
                queryString = `SELECT ${queryObject.columns ? queryObject.columns : '*'} FROM ChenoChat.${queryObject.table} WHERE ${conditionString}`;
            }
        }
    }
    else if(queryObject.statement === 'INSERT' ){
        
        // Formulate data keys as column parameters - i.e: INSERT INTO (column 1, column2, ...) ..
        let keyString = '(';
        let keys = Object.keys(queryObject.data);
        for(let i = 0; i < keys.length; i++){
            i == keys.length - 1 ? keyString += ` ${keys[i]} )` : keyString += ` ${keys[i]} ,`
        }

        // Formulate data values as column values - i.e: INSERT INTO (column 1, column2, ...) VALUE ( 'value 1' ,'value 2', '...');
        let valueString = '(';
        let values = Object.values(queryObject.data);
        for(let i = 0; i < values.length; i++){
            if(typeof(values[i]) === 'string'){
                // If value is a string, add quotes to the string value - i.g: 'value1', 'value2'
                i == values.length - 1 ? valueString += ` '${values[i]}' )` : valueString += ` '${values[i]}' ,`
            }
            else{
                // If value is NOT a string, pass it on (number/ boolean) - i.g: 9876, TRUE
                i == values.length - 1 ? valueString += ` ${values[i]} )` : valueString += ` ${values[i]} ,`
            }
        }
        queryString = `INSERT INTO ChenoChat.${queryObject.table} ${keyString} VALUES ${valueString}`;
    }
    else if(queryObject.statement === 'UPDATE'){

        let setString = '';
        let conditionString = '';
        
        // Both set values and conditions have been provided
        if(queryObject.condition != undefined && queryObject.data != undefined && queryObject.condition.length !== 0 && queryObject.data.length !== 0){
            // Formulate the SET values - i.e: UPDATE table SET column1 = value1, column2 = value2, ... 
            if(typeof(queryObject.data) === 'string'){
                setString += queryObject.data;
            }
            else if(typeof(queryObject.data) === 'object'){
                let setKeys = Object.keys(queryObject.data);
                let setValues = Object.values(queryObject.data);
                for(let i = 0; i < setKeys.length; i++){
                    if( i == setKeys.length - 1){
                        // Last set value, add closing parenthesis
                        setString += ` ${setKeys[i]} = ${typeof(setValues[i]) === 'string' ? `'${setValues[i]}' ` : `${setValues[i]} `}`
                    }
                    else{
                        // Not last set value, add comma.
                        setString += ` ${setKeys[i]} = ${typeof(setValues[i]) === 'string' ? `'${setValues[i]}',` : `${setValues[i]},`}`
                    }
                }
            }
            else{
                console.log('Invalid query DATA to SET value')
            }
            // Formulate the WHERE values - i.e: UPDATE SET column1 = value1 WHERE condition1 = 'conditionValue1'
            if(typeof(queryObject.condition) === 'string' ){
                conditionString += queryObject.condition
            }
            else if(typeof(queryObject.condition) === 'object'){
                let conditionKeys = Object.keys(queryObject.condition);
                let conditionValues = Object.values(queryObject.condition);
                for(let i = 0; i < conditionKeys.length; i++){
                    if(i == conditionKeys.length - 1){
                        //Last condition
                        conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' `: `${conditionValues[i]} `}`
                    }
                    else{
                        conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' AND `: `${conditionValues[i]} AND `}`
                    } 
                }
            }
            else{
                console.log('Invalid query WHERE value');
            }
        }
        else{
            console.log('Invalid data/condition values for INSERT statement')
        }
        queryString = `UPDATE ChenoChat.${queryObject.table} SET ${setString} WHERE ${conditionString}`
    }
    else if(queryObject.statement === 'DELETE'){
        let conditionString = '';
        if(typeof(queryObject.condition) === 'string' ){
            conditionString += queryObject.condition
        }
        else if(typeof(queryObject.condition) === 'object'){
            let conditionKeys = Object.keys(queryObject.condition);
            let conditionValues = Object.values(queryObject.condition);
            for(let i = 0; i < conditionKeys.length; i++){
                if(i == conditionKeys.length - 1){
                    //Last condition
                    conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' `: `${conditionValues[i]} `}`
                }
                else{
                    conditionString += `${conditionKeys[i]} = ${typeof(conditionValues[i]) === 'string' ? `'${conditionValues[i]}' AND `: `${conditionValues[i]} AND `}`
                } 
            }
        }
        else{
            console.log('Invalid query WHERE value');
        }
        queryString = `DELETE FROM ChenoChat.${queryObject.table} WHERE ${conditionString}`
    }
    return queryString;
}


// export function queryDB(query){
function queryDB(query){
    // Somewhere in the API a queryObject is made and passed here
    // This function's query database is either should be either a string or an object
    //      If the query is a 
    //          string - directly submit it to the connection
    //          object - parse the object using the queryParser
    // Promise to query the database, and depending on the results, resolve/reject.
    // return any query results back to the invocation point.

    return new Promise((resolve, reject)=>{
        if(query === undefined){
            reject('Error - queryDB(undefined)')
        }
        if(typeof(query) === 'object'){
            // query must be query object
            connection.query(queryParser(query), (err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
        else if(typeof(query) === 'string'){
            connection.query(query, (err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        }
    })
}

module.exports={
    queryDB
}