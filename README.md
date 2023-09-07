# Design Patterns in Node.js
<br>

```PS:``` To place my code related my learnings in design patterns.



1. <b>``Factory``</b> - <em>Its main advantage is its ability to decouple the creation of an object from one particular implementation. This allows us, for example, to create an object whose class is determined at runtime</em>.
    <br> <br>
2. <b>```Builder```</b> - <em> Builder is a creational design pattern that simplifies the creation of complex objects by providing a fluent interface, which allows us to build the object step by step. This greatly improves the readability and the general developer experience when creating such complex objects. </em> <br>
<b>ex:</b> ``` The most apparent situation in which we could benefit from the Builder pattern is a class with a constructor that has a long list of arguments, or takes many complex parameters as input. Usually, these kinds of classes require so many parameters in advance because all of them are necessary to build an instance that is complete and in a consistent state, so it's necessary to take this into account when considering potential solutions. ```
    <br> <br>
3. <b> ``` Revealing Constructor ``` </b> - <em> This is particularly useful when we want to allow an object's internals to be manipulated only during its creation phase. This allows for a few interesting scenarios, such as:
</em>

- Creating objects that can be modified only at creation time
- Creating objects whose custom behavior can be defined only at creation time
- Creating objects that can be initialized only once at creation time 

4. <b> ``` Proxy ``` </b> - <em> A proxy is an object that controls access to another object, called the subject. The proxy and the subject have an identical interface, and this allows us to swap one for the other transparently.
</em>
    ![image](https://github.com/asadbek2021/design-patters-nodejs/assets/81373435/5f2d3e53-ca96-4a06-9686-4822e4fd1f17)

5. <b> ``` Decorator ``` </b> - <em> Decorator is a structural design pattern that consists of dynamically augmenting the behavior of an existing object. It's different from classical inheritance because the behavior is not added to all the objects of the same class, but only to the instances that are explicitly decorated.
</em>
    ![image](https://github.com/asadbek2021/design-patters-nodejs/assets/81373435/67ea51a8-4f4a-420d-8602-a024a01a41db)

6. <b> ``` Adapter ``` </b> - <em>  The Adapter pattern allows us to access the functionality of an object using a different interface. </em>
    ![image](https://github.com/asadbek2021/design-patters-nodejs/assets/81373435/de700d83-b8e6-4acc-98e6-3a51e9a2c8ca)
