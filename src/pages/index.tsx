import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

type TodoStatus = 'completed' | 'pending'

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<string>('all')
  const [todoStatuses, setTodoStatuses] = useState<TodoStatus[]>([
    'completed',
    'pending',
  ])
  const handleStatusChange = (selectedStatus: string) => {
    setSelectedTab(selectedStatus)
    setTodoStatuses(getStatuses(selectedStatus))
  }

  const getStatuses = (status: string): TodoStatus[] => {
    return status !== 'all' ? [status as TodoStatus] : ['completed', 'pending']
  }

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root
          defaultValue="all"
          value={selectedTab}
          onValueChange={handleStatusChange}
          className="pt-10"
        >
          <Tabs.List className="flex items-center gap-2">
            <Tabs.Trigger
              value="all"
              className="rounded-full border border-gray-200 px-6 py-2.5 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pending"
              className="rounded-full border border-gray-200 px-6 py-2.5 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              value="completed"
              className="rounded-full border border-gray-200 px-6 py-2.5 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Completed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="pt-10" value={selectedTab}>
            <TodoList statuses={todoStatuses as ('completed' | 'pending')[]} />
          </Tabs.Content>
        </Tabs.Root>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
