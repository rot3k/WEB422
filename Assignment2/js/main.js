/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Sungsoo Cho Student ID: 121182190 Date: 2/5/2021
*
*
********************************************************************************/ 

let restaurantData = [];
let currentRestaurant = {};

let page = 1;
let perPage = 10;

let map = null;

// argv(grades)function
function avg(grades) {
    let sum = 0;
    for(let i = 0; i < grades.length; i++)
    {
        sum += grades[i].score;
    }
    return (sum/grades.length).toFixed(2);
}

// //tableRows(Lodash template)
let tableRows = _.template(
  `<% _.forEach(restaurants, function(restaurant) { %>
        <tr data-id=<%- restaurant._id %>>
            <td><%- restaurant.name %></td>
            <td><%- restaurant.cuisine %></td>
            <td><%- restaurant.address.building %> <%- restaurant.address.street %></td>
            <td><%- avg(restaurant.grades) %></td>
        </tr>  
    <% }); %>`
);


// loadRestaurantData() (function)
function loadRestaurantData(){
     fetch(`https://floating-stream-95827.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`)
    .then(res => res.json())
    .then((restaurants)=>{
        restaurantData = restaurants;
        let rows = tableRows({restaurants: restaurantData});
        $("#restaurant-table tbody").html(rows);
        $("#current-page").html(page);
    });
};

// invoke the loadRestaurantData() function
$(function(){

    loadRestaurantData();
    // 1)	Click event for all tr elements within the tbody of the restaurant-table
    $("#restaurant-table").on("click", "tr", function(){
        let dataId = $(this).attr("data-id");

        for(let i = 0; i < restaurantData.length; i++)
        {
          if(restaurantData[i]._id === dataId)
          {
            currentRestaurant = _.cloneDeep(restaurantData[i]);
          }
        }
        
        $("#restaurant-modal .modal-title").html(currentRestaurant.name);
        $("#restaurant-address").html(`${currentRestaurant.address.building} ${currentRestaurant.address.street}`);
        $(`#restaurant-modal`).modal('show');
        
    });

    // 2)	Click event for the "previous page" pagination button
    $("#previous-page").on("click", function () {
      if (page > 1) {
        page--;
        loadRestaurantData();
      }
    });

    // 3)	Click event for the "next page" pagination button
    $("#next-page").on("click", function () {
      page++;
      loadRestaurantData();
    });

    // 4)	shown.bs.modal event for the "Restaurant" modal window
    $('#restaurant-modal').on('shown.bs.modal', function () {
        map = new L.Map('leaflet', {
            center: [
              currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]
            ],
            zoom: 18,
            layers: [
                new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            ]
        });
        L.marker([currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]]).addTo(map);
    });

    //5)	hidden.bs.modal event for the "Restaurant" modal window
    $('#restaurant-modal').on('hidden.bs.modal', function (){
        map.remove();
    });

})

