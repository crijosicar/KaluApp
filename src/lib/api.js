class Api {

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params, headers = []) {
    return this.xhr(route, params, 'POST', headers)
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb, headers = []) {

    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers();
    return fetch(route, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {console.log(err);});
    }).catch( err => {
      return err;
    });
  }
}

export default Api;
