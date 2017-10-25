from .example import DrawingPad
from ipywidgets import HBox, VBox, Button
from IPython import display
import numpy as np


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

    def is_empy(self):
        return len(self.drawing_pad.data[0])==0

    def set_saved(self):
        self.__saved = self.drawing_pad.data
    
    def get_saved(self):
        return self.__saved
    
    def renormalize(self,t):
        t = (t-t[0])/(t[-1]-t[0])
        return t

    def value(self,t, list_x, list_y, list_t):
        idx = (np.abs(list_t-t)).argmin()
        return np.array([list_x[idx], list_y[idx]])

    def distance(self,x, y):
        return np.linalg.norm(x-y)

    def distance_total(self,list_x, list_y, list_t, list_x_prime, list_y_prime, list_t_prime):
        grid_time = np.linspace(0, 1, 100)
        value_tot = sum([self.distance(self.value(t, list_x, list_y, list_t), self.value(t, list_x_prime, list_y_prime, list_t_prime)) for t in grid_time])
        return value_tot

    def normalize_all(self,x,y,t):
        x = np.array(x)
        y = np.array(y)
        t = np.array(t)
        list_t_norm = self.renormalize(t)
        list_x_norm = (x - np.mean(x))/(np.std(x))
        list_y_norm = (y - np.mean(y))/(np.std(y))
        return (list_x_norm, list_y_norm, list_t_norm)

    def check(self):
        if self.is_empy():
            print("Pas de dessin")
            return
        x,y,t = self.normalize_all(self.drawing_pad.data[0], self.drawing_pad.data[1], self.drawing_pad.data[2])
        x_saved, y_saved, t_saved = self.normalize_all(self.__saved[0], self.__saved[1], self.__saved[2])
        grid_time = np.linspace(0, 1, 100)
        print(self.distance_total(x, y, t, x_saved, y_saved, t_saved))
