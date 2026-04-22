#define _USE_MATH_DEFINES
#include <iostream>
#include <cmath>
#include <string>
using namespace std;

int main() {

    const double RADIUS = 0.084;
    string latitude;
    string longitude;

    cout << "input latitude (#N/S)\n";
    cin >> latitude;
    cout << "input longitude (#E/W)\n";
    cin >> longitude;

    //convert to positive/negative based on n/s e/w

    int latLength = latitude.length();
    int longLength = longitude.length();
    double latPrepped; 
    double longPrepped;

    //interpret latitude string
    if (latitude[latLength-1] == 'N') {
        latPrepped = stod(latitude.substr(0,latLength-1));
    }
    else {
        latPrepped = -(stod(latitude.substr(0,latLength-1)));
    }

    //interpret longitude string
       if (longitude[longLength-1] == 'E') {
        longPrepped = -(stod(longitude.substr(0,longLength-1)));
    }
    else {
        longPrepped = (stod(longitude.substr(0,longLength-1)));
    }

    //convert to radians
    double longitudeOffset = 70.0; // degrees (tune this)

    double rLat = latPrepped * (M_PI/180);
    double rLong = (longPrepped + longitudeOffset) * (M_PI/180);

    //convert to coordinates

    double x = RADIUS * cos(rLat) * cos(rLong);
    double z = RADIUS * cos(rLat) * sin(rLong);
    double y = RADIUS * sin(rLat);

    cout << x << "," << y << "," << z;
}