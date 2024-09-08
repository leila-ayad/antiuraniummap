import { useState, useEffect } from "react";
import { Map, Popup } from "maplibre-gl";
import supabase from "../../config/supabaseClient";

export const MapComponent = () => {
  const [stories, setStories] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase.from("stories").select();
      if (error) {
        setFetchError("Error:", error);
        setStories(null);
        console.log(fetchError);
      }
      if (data) {
        setStories(data);
        console.log(stories);
        setFetchError(null);
        return stories;
      }
    };

    const initializeMapWithStories = async () => {
      let map = new Map({
        container: "map-container",
        style: "https://demotiles.maplibre.org/style.json",
        center: [-108.606997572, 35.534331196],
        zoom: 3,
        maplibreLogo: true,
      });

      map.on("load", async () => {
        let image = await map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
        );

        map.addImage("marker", image.data);

        const features = stories.map((story) => ({
          type: "Feature",
          properties: {
            description: `<div class="maplibregl-popup>
            <p class="maplibregl-content">${story.story_body}</p>
          </div>`,
          },
          geometry: {
            type: "Point",
            coordinates: [story.lon, story.lat],
          },
        }));

        map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: features,
          },
        });
        map.addLayer({
          id: "places-layer",
          type: "symbol",
          source: "places",
          layout: {
            "icon-image": "marker",
            "icon-overlap": "always",
            "icon-size": 1,
          },
        });

        map.on("click", "places-layer", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
          console.log(description);
          // Create a popup
          let popup = new Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
          console.log(popup);
        });

        map.on("mouseenter", "places-layer", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "places-layer", () => {
          map.getCanvas().style.cursor = "";
        });
      });

      map.on("styleimagemissing", (e) => {
        if (e.id === "marker") {
          const imageUrl =
            "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png";
          map.loadImage(imageUrl, (error, image) => {
            if (error) throw error;

            map.addImage("marker", image);
          });
        }
      });
    };

    const setupMap = async () => {
      const storiesData = await fetchStories();

      if (storiesData) {
        await initializeMapWithStories();
      }
    };

    setupMap();
  }, []);

  return <div id="map-container"></div>;
};
