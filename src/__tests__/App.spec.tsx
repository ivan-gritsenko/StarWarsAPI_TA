import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { VirtualizedList } from '../assets/components/VirtulizedList/VirtulizedList'

test('demo', () => {
  expect(true).toBe(true)
})

test("Renders the main page", () => {
  render(<VirtualizedList items={[]} loadMoreItems={() => { }} />)
  expect(true).toBeTruthy()
})