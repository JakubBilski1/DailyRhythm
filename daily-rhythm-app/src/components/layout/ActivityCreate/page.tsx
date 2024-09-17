"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Cross2Icon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faClipboard,
  faStar,
  faClock,
  faBook,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  activityName: string;
  repeatable: string;
  selectedDays: string[];
  priority: string;
  date: Date | null;
  steps: string[];
}

export const ActivityCreate = () => {
  const [steps, setSteps] = useState<string[]>([""]);
  const [date, setDate] = useState<Date>();
  const [repeatable, setRepeatable] = useState<string>("never");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [activityName, setActivityName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [formData, setFormData] = useState<FormData | null>(null); // Stores form data after submission
  const [isPreview, setIsPreview] = useState(false);

  // Add new step
  const addStep = () => {
    setSteps([...steps, ""]);
  };

  // Update step value
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  // Remove step
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(newSteps);
  };

  // Handle day selection (for Single Day or Multiple Days)
  const toggleDay = (day: string) => {
    if (repeatable === "single") {
      setSelectedDays([day]); // For single day selection, allow only one day
    } else if (repeatable === "multiple") {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter((d) => d !== day)); // Deselect day
      } else {
        setSelectedDays([...selectedDays, day]); // Select multiple days
      }
    }
  };

  const { toast } = useToast();

  const validateForm = () => {
    if (!activityName) {
      toast({
        title: "Activity Name is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!repeatable) {
      toast({
        title: "Repeatable is required.",
        variant: "destructive",
      });
      return false;
    }
    if (repeatable !== "1" && selectedDays.length === 0) {
      toast({
        title: "Select at least one day.",
        variant: "destructive",
      });
      return false;
    }
    if (repeatable === "1" && !date) {
      toast({
        title: "Date is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!priority) {
      toast({
        title: "Priority is required.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Handle form submission and save data

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    const newFormData: FormData = {
      activityName,
      repeatable,
      selectedDays,
      priority,
      date: new Date(new Date(date || "").getTime() + 90000000),
      steps,
    };
    setFormData(newFormData); // Store form data for display
    setIsPreview(true);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const body = {
        ...formData,
        repeatable: parseInt(formData.repeatable),
        priority: parseInt(formData.priority),
        token: localStorage.getItem("token"),
      };
      const response = await fetch("/api/activities", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      toast({
        title: "Activity saved successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to save activity.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-[95%] w-1/3 shadow-lg hover:shadow-symmetric-primary transition duration-300">
      <CardHeader className="flex justify-between items-center h-[10%]">
        <CardTitle>Create your activity</CardTitle>

        <AlertDialog>
          <AlertDialogTrigger className="bg-brand-primary text-brand-accent hover:bg-brand-accent hover:text-white rounded-full w-12 h-12 text-3xl flex items-center justify-center">
            {isPreview ? (
              <Pencil1Icon className="w-6 h-6" /> // Show pencil icon if in preview mode
            ) : (
              <PlusIcon className="w-6 h-6" /> // Show X icon when editing
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activity Creation</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="p-4 space-y-4">
              {/* Activity Name */}
              <div>
                <label className="block text-sm font-medium">
                  Activity Name
                </label>
                <Input
                  className="mt-1"
                  placeholder="Enter activity name"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </div>

              {/* Repeatable Select */}
              <div>
                <label className="block text-sm font-medium">Repeatable</label>
                <Select onValueChange={setRepeatable}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select repeatable option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Never</SelectItem>
                    <SelectItem value="2">Single Day</SelectItem>
                    <SelectItem value="3">Multiple Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Days of the Week */}
              {!repeatable ||
                (repeatable !== "1" && (
                  <div>
                    <label className="block text-sm font-medium">Days</label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <Button
                            variant={
                              selectedDays.includes(day) ? "default" : "outline"
                            }
                            key={day}
                            className="text-sm"
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                ))}

              {/* Priority Select */}
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <Select onValueChange={setPriority}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">High</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="1">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stops Date */}
              {repeatable === "1" && (
                <div>
                  <label className="block text-sm font-medium">Task Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Steps */}
              <div>
                <label className="block text-sm font-medium">Steps</label>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={step}
                      placeholder={`Step ${index + 1}`}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => removeStep(index)}
                      className="text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addStep}
                  className="mt-2 bg-background text-white hover:bg-brand-accent"
                >
                  + Add Step
                </Button>
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent>
        {/* Display form data if available */}
        {formData ? (
          <div className="space-y-6 p-6 bg-background rounded-lg shadow-symmetric-primary shadow-gray-900 text-white">
            {/* Activity Name */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-md w-1/3">
                <FontAwesomeIcon icon={faClipboard} className="w-8" /> Activity
                Name:
              </span>
              <span className="text-md bg-brand-background text-brand-primary px-2 py-1 rounded-md shadow w-2/3">
                {formData.activityName}
              </span>
            </div>

            {/* Repeatable */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-md w-1/3">
                <FontAwesomeIcon icon={faRepeat} className="w-8" /> Repeatable:
              </span>
              <span className="text-md bg-brand-background text-brand-primary px-2 py-1 rounded-md shadow capitalize w-2/3">
                {formData.repeatable}
              </span>
            </div>

            {/* Selected Days */}
            {formData.selectedDays.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-md w-1/3">
                  <FontAwesomeIcon icon={faCalendar} className="w-8" /> Selected
                  Days:
                </span>
                <span className="text-md bg-brand-background text-brand-primary px-2 py-1 rounded-md shadow w-2/3">
                  {formData.selectedDays.join(", ")}
                </span>
              </div>
            )}

            {/* Priority */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-md w-1/3">
                <FontAwesomeIcon icon={faStar} className="w-8" /> Priority:
              </span>
              <span
                className={`text-md px-2 py-1 rounded-md shadow border-l-8 bg-brand-background text-brand-primary w-2/3 ${
                  formData.priority === "high"
                    ? "border-l-red-600"
                    : formData.priority === "medium"
                    ? "border-l-yellow-500"
                    : "border-l-green-500"
                }`}
              >
                {formData.priority.charAt(0).toUpperCase() +
                  formData.priority.slice(1)}
              </span>
            </div>

            {/* Stops On */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-md w-1/3">
                <FontAwesomeIcon icon={faClock} className="w-8" /> Stops On:
              </span>
              <span className="text-md bg-brand-background text-brand-primary px-2 py-1 rounded-md shadow w-2/3">
                {formData.date ? format(formData.date, 'PPP') : "Not set"}
              </span>
            </div>

            {/* Steps */}
            <div className="flex items-start space-x-1">
              <FontAwesomeIcon icon={faBook} className="w-8 mt-1" />
              <div className="flex flex-col gap-4 w-full">
                <span className="font-semibold text-md flex items-start">
                  Steps:
                </span>
                <ul className="list-disc list-inside w-full flex flex-col gap-4">
                  {formData.steps.map((step: string, index: number) => (
                    <li
                      key={index}
                      className="bg-brand-background text-brand-primary px-2 py-1 rounded-md shadow list-none w-full"
                    >
                      {step || `Step ${index + 1}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button onClick={handleSave}>Save your activity</Button>
          </div>
        ) : (
          <p>No activity created yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCreate;
