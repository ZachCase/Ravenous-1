'use strict';
// Yelp API connection creds
const clientId = 'ADcC8Ck482nAvyK22ucodQ';
const secret = 'mljiZyOYwuomREVjoT4h7jGlETY3hQ8i9dIZ34dXTNkTMY84EfWerVRvc9gY8hRo';
let accessToken = '';
const urlCORS = 'https://cors-anywhere.herokuapp.com/';

const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => {
        resolve(accessToken);
      });
    }
    return fetch(`${urlCORS}https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

   async search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
       return fetch(`${urlCORS}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }).then(response => {
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log(jsonResponse);
          return jsonResponse;
        }
      }).then(jsonResponse => {
        if (jsonResponse.business) {
          return jsonResponse.business.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zipcode,
              category: business.categories.title,
              rating: business.rating,
              reviewCount: business.review_count
            };
          });
        }
      });
    });
  }

};

export default Yelp;
