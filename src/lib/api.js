const isIterable = (obj) =>
  obj != null && typeof obj[Symbol.iterator] === "function";

export const manageJsonRequest = async (reqConfig, dispatch) => {
  const sendRequest = async () => {
    const response = await fetch(reqConfig.url, {
      method: reqConfig.method || "GET",
      headers: reqConfig.headers || { "Content-Type": "application/json" },
      body: JSON.stringify(reqConfig.body),
    });

    // console.log(response);
    if (!response.ok) {
      const err = await response.json();
      console.error("request failed");
      console.error(err);

      throw new Error(err.error.message);
    }

    return response;
  };

  let response = null;
  try {
    //try request
    response = await sendRequest();

    // take some action(s) on success
    if (isIterable(reqConfig.success)) {
      reqConfig.success.map((action) => dispatch(action));
    }

    return response.json();
  } catch (err) {
    // take some action(s) on error
    if (isIterable(reqConfig.error)) {
      reqConfig.error.map((action) => dispatch(action));
    }

    return err;
  }
};
