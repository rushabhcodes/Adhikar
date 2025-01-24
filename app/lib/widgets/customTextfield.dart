import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final String hinttext;
  final TextInputType keyboardType;
  const CustomTextField(
      {super.key, required this.hinttext, required this.keyboardType});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: const Color.fromARGB(
            255,
            240,
            239,
            239,
          ),
          borderRadius: BorderRadius.circular(10)),
      child: TextField(
        keyboardType: keyboardType,
        decoration: InputDecoration(
            suffixText: '*',
            suffixStyle:const TextStyle(color: Colors.red, letterSpacing: 10),
            hintText: hinttext,
            hintStyle: const TextStyle(color: Colors.grey, fontSize: 14),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            )),
      ),
    );
  }
}
