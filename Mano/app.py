from flask import Flask, render_template, redirect

# Create an instance of Flask
app = Flask(__name__,template_folder='templates')

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    return render_template("index.html")  

# Route to the basic info
@app.route("/basic_info")
def basic_info():
    print("================")
    print("Basic Info")
    print("================")
    
    return render_template("index1.html") 


if __name__ == "__main__":
    app.run(debug=True)