const axios = require('axios');
const https = require('https');
const jwt = require("jsonwebtoken");

const insertLoginHistory = async (hostname,
    url,
    agent,
    email,
    login_type,
    domain) => {

       /*  console.log("sssssssssssssssssss", hostname,
            url,
            agent,
            email,
            login_type,
            domain, process.env.CENTRAL_GES_SERVER, process.env.CENTRAL_VPS_KEY) */

    const config = {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        headers: {
            Authorization: `Bearer ${await generateGACToken()}`,
        },
    };
 
    const axiosInstance = axios.create(config);
    try {
        const resp = await axiosInstance.post(
            process.env.CENTRAL_GES_SERVER + "/activity/loginhistory",
            {
                hostname,
                url,
                agent,
                email,
                login_type,
                domain,
                app_name: "CAREERSHEETS",
                product_name: "CAREERSHEETS"
            }
        );

       // console.log("resss from gift", resp)
    } catch (error) {
       // console.log(error);
    }
};

const generateGACToken = async () => {
    const uid = Math.random() * 500021;
    const token = await jwt.sign(
        {
            name: "RENDER",
            id: "update_id" + uid,
        },
        process.env.CENTRAL_VPS_KEY,
        { expiresIn: "10m" }
    );
    return token;
};

module.exports = {insertLoginHistory}