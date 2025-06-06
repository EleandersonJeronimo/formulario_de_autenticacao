import icon from "./assets/Icon.svg"
import { Input } from "./components/Input"
import { useRef, useState } from "react"
import "./index.css"

export function App() {
  const [digits, setDigits] = useState(["", "", "", "", ""])
  const inputRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null))

  function handleChange(value: string, index: number) {
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)

    if (value && index < 4) {
      inputRefs[index + 1].current?.focus()
    }
  }

  function handleBackspace(index: number) {
    if (index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  function handleArrowNavigation(index: number, direction: "left" | "right") {
    if (direction === "left" && index > 0) {
      inputRefs[index - 1].current?.focus()
    } else if (direction === "right" && index < 4) {
      inputRefs[index + 1].current?.focus()
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = digits.join("")
    console.log("Código:", code)
    if (code.length !== 5) {
      alert("Código incompleto.")
    } else {
      console.log("Enviado")
      alert("Codigo enviado com sucesso")
    }
  }
  

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <main className="bg-gray-100 p-8 rounded-4xl">
        <header className="flex flex-col items-center">
          <img src={icon} alt="icone" className="p-8" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-5xl">Preencha o Código</h1>
            <p className="text-gray-500 text-2xl">Enviamos um código por email e por SMS</p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between pt-8 gap-2">
            {digits.map((digit, index) => (
              <Input
                key={index}
                value={digit}
                onChange={handleChange}
                onBackspace={handleBackspace}
                index={index}
                focusRef={inputRefs[index]}
                onArrowNavigation={handleArrowNavigation}
              />
            ))}
          </div>

          <div className="flex justify-center items-center p-8 mt-7">
            <button type="submit" className="rounded-lg h-17 w-80 text-white bg-green-300">
              Verificar OTTP
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
