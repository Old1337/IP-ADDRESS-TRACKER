// styling
import "./css/reset.css";
import "./css/style.css";

// leaflet
import * as L from "leaflet";

// images
import markerIcon from "./images/icon-location.svg";

// interfaces
import { IP } from "./Interface";

// elements
const ipBtn = document.querySelector("button") as HTMLButtonElement;
const ipInput = document.querySelector("input") as HTMLInputElement;

const ipAddress = document.querySelector(".ip_address") as HTMLParagraphElement;
const ipLocation = document.querySelector(
  ".ip_location"
) as HTMLParagraphElement;
const ipTimezone = document.querySelector(
  ".ip_timezone"
) as HTMLParagraphElement;
const ipIsp = document.querySelector(".ip_isp") as HTMLParagraphElement;

ipBtn.addEventListener("click", (): void => {
  const inputValue: string = ipInput.value;

  getIpInfo(inputValue);
});

//leafjs
const map = L.map("map").setView([30.01768, 31.41169], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const locationIcon = L.icon({
  iconUrl: markerIcon,
});

const getIpOnLoad = async (): Promise<string> => {
  const request = await fetch(`https://api64.ipify.org?format=json`);
  const response = await request.json();

  return response.ip;
};

const getIpInfo = async (ip: string): Promise<void> => {
  const request = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_zNVCGTANazCydQdQsdhJRWP8ccgCG&ipAddress=${ip}`
  );
  const response = await request.json();

  const ipInfo: IP = {
    ip: response.ip,
    isp: response.isp,
    city: response.location.city,
    region: response.location.region,
    lat: response.location.lat,
    lng: response.location.lng,
    timezone: response.location.timezone,
  };

  setIpInfo(ipInfo);
};

const ip: string = await getIpOnLoad();

getIpInfo(ip);

const setIpInfo = (ipInfo: IP): void => {
  const { ip, isp, city, region, lat, lng, timezone } = ipInfo;
  ipAddress.textContent = ip;
  ipLocation.textContent = `${city}, ${region}`;
  ipTimezone.textContent = `${timezone} UTC`;
  ipIsp.textContent = isp;

  map.setView([lat, lng], 10);
  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};
