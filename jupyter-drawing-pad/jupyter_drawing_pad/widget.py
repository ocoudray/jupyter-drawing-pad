from .example import DrawingPad
from ipywidgets import HBox, Button
from IPython import display

class CustomBox(HBox):
    def __init__(self):
        drawing_pad = DrawingPad()
        button = Button(description="Clear", tooltip="Click me")
        button.on_click(lambda b : drawing_pad.clear())
        self.drawing_pad = drawing_pad
        super().__init__([drawing_pad, button])
    
