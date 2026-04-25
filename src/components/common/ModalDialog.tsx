'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from '@headlessui/react'

export default function ModalDialog({ 
  open, 
  setOpen, 
  title, 
  formData, 
  fields, 
  onSubmit, 
  submitLabel = "Add", 
  onFormChange 
}) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Basic validation for required fields
    const requiredFields = fields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!formData[field.name] || formData[field.name].toString().trim() === "") {
        setError(`${field.label} is required.`);
        return;
      }
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg text-left shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="px-6 pt-8 pb-6 sm:p-8 sm:pb-6">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <DialogTitle as="h3" className="text-xl font-bold text-center text-blue-700 dark:text-purple-400 mb-8">
                    {title}
                  </DialogTitle>
                  <div className="mt-4 flex flex-col gap-6 justify-center">
                    {fields.map((field) => (
                      <div key={field.name} className="flex flex-col items-start w-full">
                        <label htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          placeholder={field.placeholder || field.label}
                          required={field.required}
                          min={field.min}
                          className="block w-full rounded-lg border border-blue-300 dark:border-transparent bg-white dark:bg-gray-900 py-2 px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 sm:text-sm"
                          value={formData[field.name] || ''}
                          onChange={(e) => {
                            onFormChange(field.name, field.type === 'number' ? parseInt(e.target.value) : e.target.value);
                            if (error) setError(null);
                          }}
                        />
                      </div>
                    ))}
                    {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 sm:ml-3 sm:w-auto"
              >
                {submitLabel}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
