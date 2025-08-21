let con = new JsStore.Connection();
let cashflows = [];
async function init_DB() {
  await con.initDb(this.get_db_schema());
  init_data();
}

function get_db_schema() {
  var table1 = {
    name: "cashflows",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      cashflows: {
        notNull: true,
        dataType: JsStore.DATA_TYPE.Array,
      },
    },
  };
  var db = {
    name: "sekhmetDB",
    tables: [table1],
  };
  return db;
}

async function init_data() {
  let cashflowsDB = await con.select({
    from: "cashflows",
  });
  if (cashflowsDB.length == 0) {
    let value = {
      id: "0",
      cashflows: [],
    };
    await con.insert({
      into: "cashflows",
      values: [value],
    });
    cashflows =[];
    Stat.compute();
  } else {
    cashflows = cashflowsDB[0].cashflows;
  }
  
}

async function getCashflows() {
  let cashflows = await con.select({
    from: "cashflows",
  });
  return cashflows[0].cashflows;
}

async function updateDB(cashflows) {
  await con.update({
    in: "cashflows",
    where: {
      id: "0",
    },
    set: {
      cashflows: cashflows,
    },
  });
}

init_DB();
