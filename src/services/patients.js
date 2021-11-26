import Repository, { baseAthletesURL, serializeQuery } from "./repository";

const get_All = async (filter) => {
  try {
    let res = [];

    await Repository.get(`${baseAthletesURL}/athletes`).then(
      (response) => (res = response.data)
    );

    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Id = async (id) => {
  try {
    const url = `${baseAthletesURL}/athletes/${id}`;

    let res = {};

    await Repository.get(url).then((response) => (res = response.data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Options = async (type) => {
  let items = await get_All(type);

  items = items.map((item) => {
    return {
      value: item.code,
      label: item.description,
      ...item,
    };
  });

  items = [...[{ value: "", label: "" }, ...items]];

  return items;
};

export default { get_All, get_Id, get_Options };
