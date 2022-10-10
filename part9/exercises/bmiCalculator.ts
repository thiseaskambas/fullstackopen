/* interface Data {
   height: number,
   weight: number
}
 */
/* const parseArguments = (args: Array<string>) : Data => {
   if (args.length < 4) throw new Error('Not enough arguments');
   if (args.length > 4) throw new Error('Too many arguments');
 
   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
     return {
      height: Number(args[2]),
      weight: Number(args[3])
     }
   } else {
     throw new Error('Provided values were not numbers!');
   }
 } */

export const bmiCalculator = (h: number, w: number) => {
  const squaredMeters = (h / 100) * (h / 100);
  const BMI = w / squaredMeters;
  switch (true) {
    case BMI < 18.5:
      return `Underweight (${w})`;
    case BMI < 25:
      return `Normal (${w})`;
    case BMI < 30:
      return `Overweight (${w})`;
    case BMI >= 30:
      return `Obese (${w})`;
    default:
      throw new Error('Could not calculate BMI');
  }
};

/*  try {
   const {height, weight} = parseArguments(process.argv)
   console.log(bmiCalculator(height, weight))
 } catch (error: unknown){
   console.log(error)
 } */
