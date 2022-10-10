interface Result {
   daysN : number,
   trainDaysN: number,
   target: number,
   success: boolean,
   score: number,
   result: string
   avgTime : number
}

interface parcedArgs {
   weekData: Array<number>,
   target: number
}



const parseArgs = (args: Array<string>) : parcedArgs => {
   if (args.length < 4) throw new Error('Not enough arguments');
   args.slice(2).forEach(el=>{
      if (isNaN(Number(el))){
         throw new Error('Provided values were not numbers!');
      }
   })
   return {target: Number(args.slice(2,3)), weekData: args.slice(3).map(el=>Number(el))}
} 

const calculateExercises = (target: number, weekData: Array<number>) : Result => {
const daysN  = weekData.length;
const trainDaysN = weekData.reduce((acc,curr)=>{
      if(curr>0)  {
               return acc +1 
            }
            return acc
         },0);
const totalTime = weekData.reduce((acc,curr)=>acc+curr)
const avgTime = totalTime/daysN     
const success = avgTime > target 
let score = 0
let result:string
switch (true) {
   case (avgTime < target - 0.5):
      result = 'you did bad';
      score+=1
      break;
   case (avgTime < target):
      result = 'not too bad but could be better';
      score += 2
      break;
   case (avgTime >= target):
      result = 'good job'
      score += 3
      break;
   default:
      throw new Error('something went wrong')
}
return {daysN, trainDaysN, target, result, score, success, avgTime}
}

try {
   const {target, weekData} = parseArgs(process.argv)
   console.log(calculateExercises(target, weekData))
} catch (error: unknown){
   console.log(error)
 }