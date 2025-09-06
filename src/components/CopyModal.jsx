import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

const CopyModal = ({ isOpen, onClose, onConfirmCopy, trader }) => {
  const [allocateAmount, setAllocateAmount] = useState(100);
  const [stopLoss, setStopLoss] = useState(75); // Percentage of allocated amount

  const handleConfirm = () => {
    onConfirmCopy(trader.id, allocateAmount, stopLoss);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Copy {trader.username}</DialogTitle>
          <DialogDescription>
            Configure your copy-trading settings for {trader.username}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Allocate Amount (USDC)
            </Label>
            <Input
              id="amount"
              type="number"
              value={allocateAmount}
              onChange={(e) => setAllocateAmount(Number(e.target.value))}
              className="col-span-3 bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stopLoss" className="text-right">
              Stop-Loss (% of allocated)
            </Label>
            <div className="col-span-3">
              <Slider
                id="stopLoss"
                min={0}
                max={100}
                step={1}
                value={[stopLoss]}
                onValueChange={(val) => setStopLoss(val[0])}
                className="w-full"
              />
              <span className="text-sm text-gray-400">{stopLoss}% (Stop if capital drops to ${((allocateAmount * (100 - stopLoss)) / 100).toFixed(2)})</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500">Cancel</Button>
          <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white">Confirm Copy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyModal;


