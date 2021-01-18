import TextLoop from "react-text-loop"

interface UseCases {
  case: string
  color: string
}

const USE_CASES: UseCases[] = [
  { case: "routine.", color: "text-yellow-300" },
  { case: "exercise.", color: "text-purple-700" },
  { case: "inspo.", color: "text-blue-700" },
  { case: "goal.", color: "text-green-700" },
]

const Hero = () => {
  return (
    <main className="mx-auto mt-40">
      <div className="flex flex-col items-center font-semibold text-4xl sm:text-7xl">
        <p className=" mb-5">Get your next</p>
        <div className="transform translate-x-1/2">
          <TextLoop interval={1200}>
            {USE_CASES.map((useCase: UseCases, index) => (
              <span key={index} className={`${useCase.color}`}>
                {useCase.case}
              </span>
            ))}
          </TextLoop>
        </div>
      </div>
    </main>
  )
}

export default Hero
