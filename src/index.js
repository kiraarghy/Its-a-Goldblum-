import "./styles.css";
import * as faceapi from "face-api.js";
import goldblum from "../public/goldblum.json";

let boop = async () => {
  let goldblumArray = Float32Array.from(
    Object.keys(goldblum.descriptor).map(key => goldblum.descriptor[key])
  );
  let model = await new faceapi.LabeledFaceDescriptors("goldblum", [
    goldblumArray
  ]);
  console.log(model);
  const input = document.querySelector(".myImg");
  await faceapi.loadSsdMobilenetv1Model("../public");
  await faceapi.loadFaceLandmarkModel("../public");
  await faceapi.loadFaceRecognitionModel("../public");

  let fullFaceDescription = await faceapi
    .detectSingleFace(input)
    .withFaceLandmarks()
    .withFaceDescriptor();

  const maxDescriptorDistance = 0.6;
  const faceMatcher = new faceapi.FaceMatcher(model, maxDescriptorDistance);
  const results = faceMatcher.findBestMatch(fullFaceDescription.descriptor);
  document.getElementById("goldblum").innerHTML =
    results._label === "goldblum" ? "It's Jeff" : "It's not Jeff";
};

boop();
