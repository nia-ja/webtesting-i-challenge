module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  item.enhancement = Number(item.enhancement);
  if (item.enhancement < 20) {
    return { ...item, enhancement: item.enhancement + 1 };
  } else {
    return { ...item };
  }
}

function fail(item) {
  if(item.enhancement < 15) {
    return { ...item, durability: item.durability - 5 };
  } else {
    return { ...item, durability: item.durability - 10 };
  }
  
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
