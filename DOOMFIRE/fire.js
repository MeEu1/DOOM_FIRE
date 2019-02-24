/*

	CREATED BY: Artur R. M. D. Azevedo 

*/


const firePixelsArray = []; //Contain the pixels the the fire will use. 
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]; //Array containing the colors of the fire

const fireWidth = 40; //Width of the fire
const fireHeight = 40; //Heigth of the fire

let debug = false;

//Initialize the other functions. 
function start()
{
	createFireDataStructure();
	createFireSource();
	renderFire();

	setInterval(calculateFirePropagation, 50); //Calculate the fire propagation every 50 mm.
}

//Create the data structure of the fire
function createFireDataStructure()
{
	const numberOfPixels = fireWidth * fireHeight;

	for(let i = 0; i < numberOfPixels; i++)
	{
		firePixelsArray[i] = 0;
	}
}

//Calculate fire propagation
function calculateFirePropagation()
{
	//Get the pixel index and set it's value to the value of the pixel under it mminus one
	//CurrentPixel.value = PixelUnder.value - 1;

	for(let column = 0; column < fireWidth; column++)
	{
		for(let row = 0; row < fireHeight; row++)
		{
			const pixelIndex = column + (fireWidth * row);

			updateFireIntensityPerPixel(pixelIndex);
		}
	}

	renderFire();
}

//Update the fire intensity of every pixel
function updateFireIntensityPerPixel(currentPixelIndex)
{
	const belowPixelIndex = currentPixelIndex + fireWidth; //Get the index of the pixel under the current pixel

	//Check if "belowPixelIndex" isn't a base pixel
	if(belowPixelIndex >= (fireWidth * fireHeight))
	{
		return;
	}

	const decay = Math.floor(Math.random() * 3); //Value of the intensity that will be added to the current pixel
	const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]; //Set "belowPixelIndex" fire intensity
	const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0; //Set the new fire intensity as a value greater or equal to zero

	firePixelsArray[currentPixelIndex - decay] = newFireIntensity; //Set a new value of the current pixel or of the pixel on its sides
}

//Render the graphics of the fire by creating a table on html
function renderFire()
{
	debug = false;

	let html = '<table cellpadding=0 cellspacing=0>';

	//First, it implements the rows, and the the columns.
	for(let row = 0; row < fireHeight; row++)
	{
		html += '<tr>';

		for(let column = 0; column < fireWidth; column++)
		{
			const pixelIndex = column + (fireWidth * row); //Get the position in the rows and columns.

			const fireIntensity = firePixelsArray[pixelIndex];//Get the intensity of the pixel

			if(debug === true)
			{
				html += '<td>';

				html += '<div class="pixel-index">' + pixelIndex + '</div>';
				html += fireIntensity; //Add the values on the table

				html += '</td>';
			}
			else
			{
				//Set the color of the current pixel.
				const color = fireColorsPalette[fireIntensity];
				const colorString = color.r + "," + color.g + "," + color.b

				html += '<td class="pixel" style="background-color: rgb(' + colorString + ')"></td>';
			}
		}

		html += '</tr>';
	}

	html += '</html>';

	document.querySelector("#fireCanvas").innerHTML = html; //Translate into html.
}

//Create the "source" of the fire
function createFireSource()
{
	//Add a value to its current position
	for(let column = 0; column <= fireWidth; column++)
	{
		const overFlowPixelIndex = fireWidth * fireHeight;
		const pixelIndex = (overFlowPixelIndex - fireWidth) + column;

		firePixelsArray[pixelIndex] = 36;
	}
}

function toggleDebugMode() {
  if (debug === false)
  {
    fireWidth = 25;
    fireHeight = 17;
    debug = true;
  } 
  else 
  {
    fireWidth = 60;
    fireHeight = 40;
    debug = false;
  }

  createFireDataStructure();
  createFireSource();
}

start();
