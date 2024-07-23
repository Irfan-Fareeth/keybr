const Pool = require("pg").Pool;
//neontech

// const pool = new Pool({
//   user: "stupro_owner",
//   password: "A3HqoIiC0Uhw",
//   host: "ep-twilight-snowflake-a14vssdj.ap-southeast-1.aws.neon.tech",
//   port: 5432,
//   database: "keybr",
//   ssl:{
//     require:true
//   }
// });

//postgres

const pool = new Pool({
  user: "postgres",
  password: "Irfandb",
  host: "localhost",
  port: 5432,
  database: "keybr",

});

module.exports = pool;
