from .example import DrawingPad
from ipywidgets import HBox, VBox, Button
from IPython import display

class CustomBox(HBox):
    def __init__(self):
        drawing_pad = DrawingPad()
        button = Button(description="Clear", tooltip="Click me")
        save_button = Button(description="Save", tooltip="Click me")
        login_button = Button(description="Login", tooltip="Click me")
        button.on_click(lambda b : drawing_pad.clear())
        save_button.on_click(lambda b : self.set_saved())
        login_button.on_click(lambda b : self.check())
        buttons = VBox([button, save_button, login_button])
        self.drawing_pad = drawing_pad
        self.__saved = []
        super().__init__([drawing_pad, buttons])

    def set_saved(self):
        self.__saved = self.drawing_pad.data
    
    def get_saved(self):
        return self.__saved
    
    def check(self):
        print("ok")
    
