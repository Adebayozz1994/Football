"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface State {
  id: string
  name: string
  capital: string
  population: string
  area: string
  region: string
}

export default function StatesManagementPage() {
  const [states, setStates] = useState<State[]>([
    { id: "1", name: "Lagos", capital: "Ikeja", population: "21M", area: "3,345 km²", region: "South West" },
    { id: "2", name: "Kano", capital: "Kano", population: "15M", area: "20,131 km²", region: "North West" },
    { id: "3", name: "Rivers", capital: "Port Harcourt", population: "7M", area: "11,077 km²", region: "South South" },
    { id: "4", name: "Plateau", capital: "Jos", population: "4.2M", area: "30,913 km²", region: "North Central" },
    { id: "5", name: "Abia", capital: "Umuahia", population: "3.7M", area: "6,316 km²", region: "South East" },
  ])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentState, setCurrentState] = useState<State | null>(null)
  const [newState, setNewState] = useState<Omit<State, "id">>({
    name: "",
    capital: "",
    population: "",
    area: "",
    region: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddState = () => {
    const id = (states.length + 1).toString() // Simple ID generation
    setStates([...states, { ...newState, id }])
    setNewState({ name: "", capital: "", population: "", area: "", region: "" })
    setIsAddModalOpen(false)
  }

  const handleEditState = () => {
    if (currentState) {
      setStates(states.map((s) => (s.id === currentState.id ? currentState : s)))
      setIsEditModalOpen(false)
      setCurrentState(null)
    }
  }

  const handleDeleteState = () => {
    if (currentState) {
      setStates(states.filter((s) => s.id !== currentState.id))
      setIsDeleteModalOpen(false)
      setCurrentState(null)
    }
  }

  const filteredStates = states.filter(
    (state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">State Management</h1>
        <p className="text-muted-foreground">Manage the states and their details within the platform.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All States</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add State
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State Name</TableHead>
                <TableHead>Capital</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStates.map((state) => (
                <TableRow key={state.id}>
                  <TableCell className="font-medium">{state.name}</TableCell>
                  <TableCell>{state.capital}</TableCell>
                  <TableCell>{state.population}</TableCell>
                  <TableCell>{state.area}</TableCell>
                  <TableCell>{state.region}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentState(state)
                        setIsEditModalOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentState(state)
                        setIsDeleteModalOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredStates.length === 0 && <p className="text-center text-muted-foreground py-4">No states found.</p>}
        </CardContent>
      </Card>

      {/* Add State Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New State</DialogTitle>
            <DialogDescription>Enter the details for the new state.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">State Name</Label>
              <Input
                id="add-name"
                value={newState.name}
                onChange={(e) => setNewState({ ...newState, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-capital">Capital</Label>
              <Input
                id="add-capital"
                value={newState.capital}
                onChange={(e) => setNewState({ ...newState, capital: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-population">Population</Label>
              <Input
                id="add-population"
                value={newState.population}
                onChange={(e) => setNewState({ ...newState, population: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-area">Area</Label>
              <Input
                id="add-area"
                value={newState.area}
                onChange={(e) => setNewState({ ...newState, area: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-region">Region</Label>
              <Input
                id="add-region"
                value={newState.region}
                onChange={(e) => setNewState({ ...newState, region: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddState}>Add State</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit State Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit State</DialogTitle>
            <DialogDescription>Update the details for the selected state.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">State Name</Label>
              <Input
                id="edit-name"
                value={currentState?.name || ""}
                onChange={(e) => setCurrentState({ ...currentState!, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-capital">Capital</Label>
              <Input
                id="edit-capital"
                value={currentState?.capital || ""}
                onChange={(e) => setCurrentState({ ...currentState!, capital: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-population">Population</Label>
              <Input
                id="edit-population"
                value={currentState?.population || ""}
                onChange={(e) => setCurrentState({ ...currentState!, population: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-area">Area</Label>
              <Input
                id="edit-area"
                value={currentState?.area || ""}
                onChange={(e) => setCurrentState({ ...currentState!, area: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-region">Region</Label>
              <Input
                id="edit-region"
                value={currentState?.region || ""}
                onChange={(e) => setCurrentState({ ...currentState!, region: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditState}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete State Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the state &quot;{currentState?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteState}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
