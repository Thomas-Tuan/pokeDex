import { accentColors } from "../constant/AccentColor";

function getRandomColor(randomColors) {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return randomColors[randomIndex];
}

function useRandomColor(props) {
    const colorKeys = Object.keys(accentColors);
    const colorList = colorKeys.map((colorKey) => accentColors[colorKey].background);
    const randomColors = getRandomColor(colorList);
    return randomColors;
}

export default useRandomColor;