from flask import Flask
from flask import Response
from flask import render_template
from flask import request
import json
from flask import jsonify
import sqlite3
from flask import g
from flask_sqlalchemy import SQLAlchemy
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
 
 
class Task(db.Model):
    """定义数据模型"""
    __tablename__ = 'tasks'
    taskInfo = db.Column(db.String(120), unique=True, primary_key=True)
    done = db.Column(db.Integer)
 
    def __init__(self, taskInfo, done):
        self.taskInfo = taskInfo
        self.done = done
 
    def __repr__(self):
        return '<Task %r>' % self.taskInfo

@app.route("/")
def index():
    todolist = []
    donelist = []
    tasks = Task.query.all()
    for task in tasks:
        if(task.done == 0):
            todolist.append(task.taskInfo)
        else:
            donelist.append(task.taskInfo)

    return render_template("index.html",todoitems = todolist, doneitems=donelist)

@app.route("/addtask/",methods=['GET','POST'])
def addTask():
    if request.method == 'POST':
        newtaskInfo=request.form['info']
        if not Task.query.filter_by(taskInfo=newtaskInfo).first():
            db.session.add(Task(newtaskInfo,0))
            db.session.commit()
        print(newtaskInfo)
        return newtaskInfo

@app.route("/deltask/",methods=['GET','POST'])
def delTask():
    if request.method == 'POST':
        deltaskInfo=request.form['info']
        tmp = Task.query.filter_by(taskInfo=deltaskInfo).first()
        db.session.delete(tmp)
        db.session.commit()
        print(deltaskInfo)
        return deltaskInfo
		
@app.route("/donetask/",methods=['GET','POST'])
def doneTask():
    if request.method == 'POST':
        newtaskInfo=request.form['info']
        tmp = Task.query.filter_by(taskInfo=newtaskInfo).first()
        tmp.done = 1
        db.session.add(tmp)
        db.session.commit()
        print(newtaskInfo)
        return newtaskInfo
		
@app.route("/edittask/",methods=['GET','POST'])
def editTask():
    if request.method == 'POST':
        pretaskInfo=request.form['preInfo']
        newtaskInfo=request.form['info']
        print("ok")
        tmp = Task.query.filter_by(taskInfo=pretaskInfo).first()
        tmp.taskInfo = newtaskInfo
        db.session.add(tmp)
        db.session.commit()
        print(newtaskInfo)
        return newtaskInfo

if __name__ == "__main__":
    app.run()