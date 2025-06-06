import { useEffect } from "react"

interface InputProps {
  value: string
  onChange: (value: string, index: number) => void
  onBackspace: (index: number) => void
  index: number
  focusRef: React.RefObject<HTMLInputElement>
  onArrowNavigation: (index: number, direction: "left" | "right") => void
}

export function Input({
  value,
  onChange,
  onBackspace,
  index,
  focusRef,
  onArrowNavigation,
}: InputProps) {
  useEffect(() => {
    if (index === 0 && focusRef.current) {
      focusRef.current.focus()
    }
  }, [focusRef, index])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !value) {
      onBackspace(index)
    } else if (e.key === "ArrowLeft") {
      onArrowNavigation(index, "left")
    } else if (e.key === "ArrowRight") {
      onArrowNavigation(index, "right")
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value
    if (/^\d?$/.test(inputValue)) {
      onChange(inputValue, index)
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text")
    if (/^\d{5}$/.test(pasted)) {
      for (let i = 0; i < 5; i++) {
        onChange(pasted[i], i)
      }
    } else {
      alert("O código colado deve conter exatamente 5 dígitos numéricos.")
    }
    e.preventDefault()
  }

  return (
    <input
      ref={focusRef}
      type="tel"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg"
    />
  )
}
